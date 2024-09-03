"use client";

import { useState, useContext, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import AuthContext from '@/context/AuthContext';
import { useGlobalContext } from '@/context/GlobalContext';

export default function LoginPage() {
  const { login, logado, errors } = AuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { globalState, updateGlobalState } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  async function getConfig(token) {
    setLoading(true);
    try {
      const response = await fetch(`/items/empresa_config`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const json = await response.json();
      console.log(json);
      const data = json.data;
      const config = data[0];
      const configMap = {
        "erp_app": config.ERP_APP,
        "erp_user": config.ERP_USER,
        "erp_token": config.ERP_TOKEN
      };
      console.info(configMap);
      updateGlobalState({ config: configMap });
      localStorage.setItem("logado", true);
      // updateGlobalState({ logado: true });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmitNovo = async (e) => {
    e.preventDefault();

    if (email === "" || password == "") {
      return alert("Email ou senha não pode estar vázio!")
    } else {
      login(email, password);
      //console.log(password, email);
    }
  }

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (email === "" || password == "") {
        return alert("Email ou senha não pode estar vázio!")
      } else {
        // login(email, password);
        //console.log(password, email);

        try {
          const response = await fetch('https://apimongo.sdbr.app/auth/login', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "email": email,
              "password": password,
            }),
          });

          if(response.status === 200) {
            const data = await response.json();
            const access_token = data.directusResp.data.access_token;
            console.log();
            /* const configAPI =  */await getConfig(access_token);
            // console.log(config);
            // updateGlobalState({ config: configAPI });
          }
        } catch (error) {
          console.error(error);
        }
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
