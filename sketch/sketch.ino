/*******
 * Copyright © 2020 Shubhendra Kushwaha
 * shubhendrakushwaha94@gmail.com
 * Project Url: https://github.com:TheShubhendra/nodemcu-websocket-reactapp.git
 *******/

// Import neccesary libraries
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "html.h"

// WiFi Network credentials
#define SSID "<NETWORK-SSID>"
#define PASSWORD "<PASSWORD>"


bool states[9] = {false};

int pin[] = { 16, 5, 4, 0, 2, 14, 12, 13, 15 };
// Create Async Webserver on port 80
AsyncWebServer server(80);
//Create Async WebSocket
AsyncWebSocket ws("/ws");

void sendState(int id, bool state) {
    StaticJsonDocument < 35 > doc;
    String msg;
    doc["id"] = id;
    if (state) {
        doc["state"] = "on";
    } else {
        doc["state"] = "off";
    }
    serializeJson(doc, msg);
    ws.textAll(msg);
}

void changeState(int id, bool state) {
    if (state) {
        digitalWrite(pin[id], HIGH);
        states[id] = true;
    } else {
        digitalWrite(pin[id], LOW);
        states[id] = false;
    }
    sendState(id, state);
}
// Handle WebSocket message
void handleRequest(uint8_t * data) {
    StaticJsonDocument < 35 > doc;

    deserializeJson(doc, data);
    const int id = doc["id"];
    const char * toggle = doc["toggle"];
    if (strcmp(toggle, "on") == 0) {
        Serial.printf("Turning on %d\n", id);
        changeState(id, true);
    } else if (strcmp(toggle, "off") == 0) {
        Serial.printf("Turning off %d\n", id);
        changeState(id, false);
    }
}

// Handle WebSocket events 
void onEvent(AsyncWebSocket * server, AsyncWebSocketClient * client, AwsEventType type,
    void * arg, uint8_t * data, size_t len) {
    if (type == WS_EVT_CONNECT) {
        Serial.printf("WebSocket client #%u connected from %s\n", client -> id(), client -> remoteIP().toString().c_str());
        for (int i = 0; i < 9; i++) {
            sendState(i, states[i]);
        }
    } else if (type == WS_EVT_DISCONNECT) {
        Serial.printf("WebSocket client #%u disconnected\n", client -> id());
    } else if (type == WS_EVT_DATA) {
        AwsFrameInfo * info = (AwsFrameInfo * ) arg;
        if (info -> final && info -> index == 0 && info -> len == len && info -> opcode == WS_TEXT) {
            data[len] = 0;
            Serial.printf("Got Data: %s\n", data);
            handleRequest(data);
        }
    }

}

void setup() {

    Serial.begin(115200);
    for (int i = 0; i < 9; i++) {
        pinMode(pin[i], OUTPUT);
    }

    WiFi.setSleepMode(WIFI_NONE_SLEEP);
    WiFi.mode(WIFI_STA);
    WiFi.persistent(false);
    Serial.print("Connecting to wifi....");
    WiFi.begin(SSID, PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("Connected.");
    Serial.printf("IP Address %s\n", WiFi.localIP());
    Serial.printf("Gataway IP: %s\n", WiFi.gatewayIP().toString().c_str());
    ws.onEvent(onEvent);
    server.addHandler( & ws);
    server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
        Serial.printf("GET / %s \n", request -> host());
        AsyncWebServerResponse * response = request -> beginResponse_P(200, "text/html", html, html_len);
        response -> addHeader("Content-Encoding", "gzip");
        request -> send(response);
    });
    server.begin();
}

void loop() {
    ws.cleanupClients();
    for (int i = 0; i < 9; i++) {
        if (states[i]) {
            digitalWrite(pin[i], HIGH);
        } else {
            digitalWrite(pin[i], LOW);
        }
    }
}
