// ✅ 纯原生JS - SQLite数据库自动连接+自动建表 (完美适配你的user_settings表)
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./chess_user.db', (err) => {
  if (err) console.error('✅ 数据库连接失败:', err.message);
  else console.log('✅ SQLite数据库连接成功 ✔️');
});

// ✅ 自动建表 - 有表跳过，无表创建，和你原来的表结构完全一致
db.run(`CREATE TABLE IF NOT EXISTS user_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT NOT NULL UNIQUE,
  preferences TEXT NOT NULL
)`, (err) => {
  if (err) console.error('✅ 建表失败:', err.message);
  else console.log('✅ user_settings表创建成功 ✔️');
});

// ✅ 挂载数据库到全局，让你的TS项目能调用
global.db = db;

// ✅ 启动你的项目服务 (核心：直接引入你的TS编译后的入口，或原生启动服务)
require('./index.ts');
