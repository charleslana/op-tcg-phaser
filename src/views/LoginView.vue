<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const password = ref('');

function handleLogin() {
  console.log('Username:', username.value);
  console.log('Password:', password.value);
}
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-box {
  text-align: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2,
label {
  color: black;
}

.form-group {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
