"use client";

import { useState, useContext, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import AuthContext from '@/context/AuthContext';

export default function LoginPage() {
  const { login, loading, logado, errors } = AuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password == "") {
      return alert("Email ou senha não pode estar vázio!")
    } else {
      login(email, password);
      //console.log(password, email);
    }
  };

  //console.log(localStorage.getItem("logado"));

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.divForm}>
          <label className={styles.label}>
            Email
          </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} autoComplete='email' />
          <label className={styles.label}>
            Senha
          </label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} autoComplete="current-password" />
          <button className={styles.button} onClick={handleSubmit}>Entrar</button>
        </form>
      </div>
      <div className={styles.loading}>
        {
          loading ? (
            <h3>Carregando...</h3>
          ) : (
            <></>
          )
        }
      </div>

    </div>
  );
}
