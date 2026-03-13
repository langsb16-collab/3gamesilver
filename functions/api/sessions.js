// Cloudflare Pages Function for getting sessions
export async function onRequestGet(context) {
  const { DB } = context.env;
  
  try {
    // Initialize database schema
    await DB.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT DEFAULT CURRENT_TIMESTAMP,
        game_type TEXT,
        duration INTEGER,
        score INTEGER
      )
    `);
    
    const result = await DB.prepare(
      "SELECT * FROM sessions ORDER BY date DESC LIMIT 10"
    ).all();
    
    return new Response(JSON.stringify(result.results || []), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch sessions' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Cloudflare Pages Function for creating sessions
export async function onRequestPost(context) {
  const { DB } = context.env;
  
  try {
    // Initialize database schema
    await DB.exec(`
      CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT DEFAULT CURRENT_TIMESTAMP,
        game_type TEXT,
        duration INTEGER,
        score INTEGER
      )
    `);
    
    const body = await context.request.json();
    const { game_type, duration, score } = body;
    
    const result = await DB.prepare(
      "INSERT INTO sessions (game_type, duration, score) VALUES (?, ?, ?)"
    ).bind(game_type, duration, score).run();
    
    return new Response(JSON.stringify({ id: result.meta.last_row_id }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create session' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
