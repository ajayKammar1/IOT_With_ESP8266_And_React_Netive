#include <ESP8266WiFi.h>
#include <WebSocketsServer.h>

// Define pins for sensors and buzzer
int fireSensorPin = D1;   // Fire sensor digital output pin
int smokeSensorPin = D2;  // Smoke sensor digital output pin
int tempSensorPin = A0;   // Temperature sensor analog output pin
int buzzerPin = D7;       // Buzzer output pin

// Create WebSocket servers on different ports for each sensor
WebSocketsServer fireWebSocket = WebSocketsServer(81);   // Fire sensor WebSocket server
WebSocketsServer smokeWebSocket = WebSocketsServer(82);  // Smoke sensor WebSocket server
WebSocketsServer tempWebSocket = WebSocketsServer(83);   // Temperature sensor WebSocket server

// Variables to store sensor states
int fireState = 0;
int smokeState = 0;
int tempValue = 0;

String fireData="";
 String smokeData="";

void webSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length) {
  // Handle WebSocket events (optional, not used in this example)
}

void setup() {
  // Initialize Serial for debugging
  Serial.begin(9600);a
  Serial.println("Device is ON");

  // Initialize WiFi connection
  //          WifiName, Passowrd
  WiFi.begin("Nagraj@07", "");


  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Initialize sensor and buzzer pins
  pinMode(fireSensorPin, INPUT);
  pinMode(smokeSensorPin, INPUT);
  pinMode(buzzerPin, OUTPUT);
  digitalWrite(buzzerPin, LOW); // Ensure buzzer is off initially

  // Start WebSocket servers for each sensor
  fireWebSocket.begin();
  fireWebSocket.onEvent(webSocketEvent);
  smokeWebSocket.begin();
  smokeWebSocket.onEvent(webSocketEvent);
  tempWebSocket.begin();
  tempWebSocket.onEvent(webSocketEvent);
  
  Serial.println("WebSocket servers started");
}

void loop() {
  // Read sensor values
  fireState = digitalRead(fireSensorPin);
  smokeState = digitalRead(smokeSensorPin);
  tempValue = analogRead(tempSensorPin);

  // Convert temperature sensor analog value to Celsius (assuming LM35)
  float millivolts = (tempValue / 1024.0) * 3300; // 3300 is the voltage provided by NodeMCU
  float celsius = millivolts / 100; // LM35 gives 10mV per degree Celsius

  // Control buzzer based on fire or smoke sensor state
  if (fireState == LOW ) { // Assuming LOW means detection
    digitalWrite(buzzerPin, HIGH); // Turn on buzzer
       fireData = "Flem Detected..";
  } else {
    digitalWrite(buzzerPin, LOW);  // Turn off buzzer
      fireData = "No Flem Detected..";
  }

    if ( smokeState == LOW  ) { // Assuming LOW means detection
    digitalWrite(buzzerPin, HIGH); // Turn on buzzer
    smokeData = "Smoke is Detected ....";
  } else {
    digitalWrite(buzzerPin, LOW);  // Turn off buzzer
     smokeData = "no Smoke Detected ....";
  }

    if (celsius > 27) { // Assuming LOW means detection
    digitalWrite(buzzerPin, HIGH); // Turn on buzzer
  } else {
    digitalWrite(buzzerPin, LOW);  // Turn off buzzer
  }

  // Create String objects for sensor data
  // String fireData = String(fireState);
  // String smokeData = String(smokeState);
  String tempData = String(celsius);

  // Send sensor data to respective WebSocket clients
  fireWebSocket.broadcastTXT(fireData);   // Send fire sensor state
  smokeWebSocket.broadcastTXT(smokeData); // Send smoke sensor state
  tempWebSocket.broadcastTXT(tempData);   // Send temperature value

  // Handle WebSocket client connections
  fireWebSocket.loop();
  smokeWebSocket.loop();
  tempWebSocket.loop();

  // Delay before next sensor reading
  delay(1000); // Adjust delay as needed
}
