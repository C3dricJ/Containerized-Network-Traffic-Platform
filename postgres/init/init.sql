CREATE TABLE IF NOT EXISTS packets (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source_ip VARCHAR(50),
    destination_ip VARCHAR(50),
    protocol VARCHAR(20),
    packet_length INTEGER
);
