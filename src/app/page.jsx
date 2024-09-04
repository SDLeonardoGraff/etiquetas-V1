"use client";

import { useState, useContext, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css";
import AuthContext from '@/context/AuthContext';
import { useGlobalContext } from '@/context/GlobalContext';
import ModalEmpresas from '../../components/modalEmpresas/modalEmpresas';
import ModalErro from '../../components/modalErro/modalErro';

export default function LoginPage() {
  const { login, logado, errors } = AuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { globalState, updateGlobalState } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [erroLogin, setErrologin] = useState(false);
  const [dadosVazios, setDadosVazios] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [modalAviso, setModalAviso] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openErro = () => setModalErro(true);
  const closeErro = () => setModalErro(false);

  const openAviso = () => setModalAviso(true);
  const closeAviso = () => setModalAviso(false);

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
      const config = data;
      const configMap = config.map((item) => ({
        "erp_app": item.ERP_APP,
        "erp_user": item.ERP_USER,
        "erp_token": item.ERP_TOKEN
      }));
      console.info(config);
      setEmpresas(configMap);
      openModal();
      // updateGlobalState({ config: configMap });
      // localStorage.setItem("logado", true);
      // localStorage.setItem("dadosLogin", JSON.stringify(configMap));
      // updateGlobalState({ logado: true });
      // router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSelectEmpresa = (empresa) => {
    setSelectedEmpresa(empresa);
    console.log('Empresa selecionada:', empresa.erp_app);
    localStorage.setItem("logado", true);
    localStorage.setItem("dadosLogin", JSON.stringify(empresa));
    router.push("/dashboard");
    setEmail('');
    setPassword('');
    closeModal();
    // Aqui você pode salvar a empresa selecionada em um contexto global, localStorage, etc.
  };

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
      // return alert("Email ou senha não pode estar vázio!");
      // setDadosVazios(true);
      openAviso();
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

        if (response.status === 200) {
          const data = await response.json();
          const access_token = data.directusResp.data.access_token;
          console.log();
            /* const configAPI =  */await getConfig(access_token);
          // console.log(config);
          // updateGlobalState({ config: configAPI });
        }

        if (response.status === 400 || response.status === 401) {
          console.log("erro");
          //setErrologin(true);
          openErro();
        }
      } catch (error) {
        console.error(error);
        // setErrologin(true);
        openErro();
      }
    }
  };

  console.log(localStorage.getItem("dadosLogin"));

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

      {
        isModalOpen ? (
          <ModalEmpresas isOpen={isModalOpen} onClose={closeModal}>
            <h2 style={{ color: '#000', marginBottom: '20px' }}>Selecione uma Empresa</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                {empresas.length > 0 ? (
                  empresas.map((empresa, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#000' }}>{empresa.erp_app}</span>
                      <button onClick={() => handleSelectEmpresa(empresa)} style={{ padding: '10px' }}>Selecionar</button>
                    </div>
                  ))
                ) : (
                  <p>Carregando empresas...</p>
                )}
              </div>
            </div>
          </ModalEmpresas>
        ) : (<></>)
      }

      {
        modalErro ? (
          <ModalErro isOpen={modalErro} onClose={closeModal}>
            <h2 style={{ color: '#B22222', textShadow: '1px 1px 1px #000', marginBottom: '40px' }}>Erro</h2>
            <p style={{ color: '#000', marginBottom: '5px' }}>Verifique suas credências de acesso!</p>
            <p style={{ color: '#000', marginBottom: '60px' }}>Email ou Senha estão incorretos</p>
            <button className={styles.buttonAtencao} onClick={() => closeErro()}>Entendi</button>
          </ModalErro>
        ) : (
          <></>
        )
      }

      {
        modalAviso ? (
          <ModalErro isOpen={modalAviso} onClose={closeModal}>
            <h2 style={{ color: '#FFA500', textShadow: '1px 1px 1px #000', marginBottom: '40px' }}>Atenção</h2>
            <p style={{ color: '#000', marginBottom: '60px' }}>Email ou Senha não podem ser vázios</p>
            <button className={styles.buttonAtencao} onClick={() => closeAviso()}>Entendi</button>
          </ModalErro>
        ) : (
          <></>
        )
      }

    </div>
  );
}
