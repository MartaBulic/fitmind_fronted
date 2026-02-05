<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* ================================ */
/* CRITICAL GLOBAL RESET */
/* ================================ */
* {
  margin: 0 !important;
  padding: 0 !important;
  box-sizing: border-box;
}

html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
  height: 100%;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  background-color: #f5f5f5;
}

/* ================================ */
/* APP CONTAINER */
/* ================================ */
#app {
  max-width: 5000px;
  margin: 10px auto !important;
  padding: 20px !important;
  background: #fff;
  border-radius: 10px;
  min-height: 100vh;
}

/* ================================ */
/* GLOBAL FORM ELEMENTS */
/* ================================ */
input, textarea, select {
  padding: 12px 15px !important;
  margin-top: 5px !important;
  display: block;
  width: 100%;
  box-sizing: border-box;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #ff6b35;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

/* ================================ */
/* GLOBAL BUTTONS */
/* ================================ */
button {
  padding: 12px 24px !important;
  margin-top: 15px !important;
  display: inline-block;
  width: auto;
  background: linear-gradient(135deg, #974f39 0%, #ff6b35 100%);
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(241, 130, 19, 0.4);
}

/* ================================ */
/* GLOBAL LINKS */
/* ================================ */
a {
  color: #ff6b35;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #f18213;
  text-decoration: underline;
}

/* ================================ */
/* TEXT CONTENT SPACING */
/* ================================ */
p, h1, h2, h3, h4, h5, h6, span, div {
  margin: revert !important;
  padding: revert !important;
}

/* ================================ */
/* UTILITY CLASSES */
/* ================================ */
.text-center { text-align: center; }
.text-right { text-align: right; }
.mt-1 { margin-top: 0.5rem !important; }
.mt-2 { margin-top: 1rem !important; }
.mt-3 { margin-top: 1.5rem !important; }
.mt-4 { margin-top: 2rem !important; }
.mb-1 { margin-bottom: 0.5rem !important; }
.mb-2 { margin-bottom: 1rem !important; }
.mb-3 { margin-bottom: 1.5rem !important; }
.mb-4 { margin-bottom: 2rem !important; }
.p-1 { padding: 0.5rem !important; }
.p-2 { padding: 1rem !important; }
.p-3 { padding: 1.5rem !important; }
.p-4 { padding: 2rem !important; }

/* ================================ */
/* SCROLLBAR STYLING */
/* ================================ */
::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 5px; }
::-webkit-scrollbar-thumb { background: linear-gradient(135deg, #974f39 0%, #ff6b35 100%); border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: linear-gradient(135deg, #7a3f2e 0%, #e85d2a 100%); }

/* ================================ */
/* RESPONSIVE ADJUSTMENTS */
/* ================================ */
@media (max-width: 768px) {
  #app { padding: 10px !important; margin: 10px !important; border-radius: 8px; }
  button { padding: 10px 20px !important; font-size: 0.95rem; }
  input, textarea, select { padding: 10px 12px !important; font-size: 0.95rem; }
}

@media (max-width: 480px) {
  #app { padding: 8px !important; margin: 5px !important; border-radius: 6px; }
  button { padding: 8px 16px !important; font-size: 0.9rem; }
}
</style>
