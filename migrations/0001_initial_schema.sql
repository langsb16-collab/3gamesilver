-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT DEFAULT CURRENT_TIMESTAMP,
  game_type TEXT,
  duration INTEGER,
  score INTEGER
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_sessions_date ON sessions(date DESC);
