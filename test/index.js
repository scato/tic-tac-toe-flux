const context = require.context('./', true, /(app|cli|model)\/.*(js|ts)$/);

context.keys().forEach(context);
