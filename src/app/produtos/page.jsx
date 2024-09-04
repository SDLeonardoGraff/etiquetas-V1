"use client";

import React, { useEffect, useState } from "react";
import Button from "../../../components/buttonProdutos/ButtonProdutos";
import '@/../components/Input/input.css';
import styles from './produtos.module.css';
import { useGlobalContext } from "@/context/GlobalContext";
import Sidebar from "../../../components/sidebar/Sidebar";
import Pagination from "../../../components/pagination/Pagination";
import Alert from "../../../components/alert/Alert";
import Hour from "../../../components/hour/Hour";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Produtos = () => {
    const [value, setValue] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [filtro, setFiltro] = useState(false);
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);
    //const [produtosSelecionados2, setProdutosSelecionados2] = useState([]);
    const { globalState, updateGlobalState } = useGlobalContext();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPorPagina = 8;
    const items = globalState.produtos;
    // const configApp = globalState.config;
    const [showAlert, setShowAlert] = useState(false);
    const [message1, setMessage1] = useState("");
    const [message2, setMessage2] = useState("");
    const [message3, setMessage3] = useState("");
    const [message4, setMessage4] = useState("");
    const [filters, setFilters] = useState({
        codigo: "",
        nome: "",
        codigoEAN: "",
        numeroSerie: "",
        marca: "",
        categoria: "",
        deposito: "",
        genero: "",
    });
    const [produtosFilter, setProdutosFilter] = useState(null);
    const router = useRouter();
    const [loadingDados, setLoadingDados] = useState(false);
    const [logado, setLogado] = useState(false);
    const [visible, setVisible] = useState(false);
    // const { globalState, updateGlobalState } = useGlobalContext();

    // console.log(localStorage.getItem("logado"));

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    console.info(globalState);

    /* useEffect(() => {
        setLoading(true);
        if (!localStorage.getItem("logado")) {
            router.push("/");
        }
        setLoading(false);
        return;
    }, []) */

    useEffect(() => {
        const checkLogin = async () => {
            setLoading(true);
            const isLoggedIn = localStorage.getItem("logado");
            console.log(isLoggedIn);
            setLogado(isLoggedIn);
            if (isLoggedIn === "false") {
                router.push("/");
            }
            setLoading(false);
        };
        checkLogin();
    }, []);

    //console.log(filters)

    const handleValue = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
    };

    //const filteredItems = applyFilters();
    const indexOfLastItem = currentPage * itemsPorPagina;
    const indexOfFirstItem = indexOfLastItem - itemsPorPagina;
    let currentItems = Array.isArray(items) ? items.slice(indexOfFirstItem, indexOfLastItem) : [];

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const clearFilters = () => {
        setFilters({
            codigo: "",
            nome: "",
            codigoEAN: "",
            numeroSerie: "",
            marca: "",
            categoria: "",
            deposito: "",
            genero: "",
        });
    };

    function getConfig() {
        if(typeof window !== "undefined") {
            const storedConfig = localStorage.getItem("dadosLogin");
            if(storedConfig !== null) {
                try {
                    const config = JSON.parse(storedConfig);
                    return config;
                } catch(error) {
                    console.error(error);
                }
            }       
        }
        return [];
    };

    const configApp = getConfig();

    console.log(produtosFilter);

    const buildQuery = () => {
        const filterOrder = ["codigo", "numeroSerie", "nome", "genero", "categoria", "marca", "deposito", "codigoEAN"];
        const query = filterOrder
            .map(key => filters[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}` : "")
            .filter(Boolean)
            .join("&");
        return query ? `/api/request/Produtos/Pesquisar?${decodeURIComponent(query)}` : "/api/request/Produtos/Pesquisar";
    };

    const handleSearch = async () => {
        handleFilter();
        const url = buildQuery();
        console.log(url);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    // "Authorization-Token": process.env.NEXT_PUBLIC_TOKEN,
                    // "User": process.env.NEXT_PUBLIC_USER,
                    // "App": process.env.NEXT_PUBLIC_APP,
                    "Authorization-Token": configApp.erp_token,
                    "User": configApp.erp_user,
                    "App": configApp.erp_app,
                }
            })
            const json = await response.json();
            updateGlobalState({ produtos: json });
        } catch (error) {
            console.log(error)
        } finally {
            console.log("Finalizou!");
        }
        // Aqui você pode fazer a requisição usando fetch ou axios
        // fetch(url).then(response => response.json()).then(data => console.log(data));
    };

    const handleFilter = () => {
        setValue("");
        clearFilters();
        //setProdutosSelecionados("");
        setFiltro(!filtro);
    }

    const handlePrint = () => {
        if (produtosSelecionados.length === 0) {
            setShowAlert(!showAlert);
            setMessage1("Sua Fila de impressão está vazia!");
            setMessage2("Selecione algum produto antes!");
        } else {
            setShowAlert(!showAlert);
            setMessage1("Imprimindo...");
            setMessage2("");
            setEtiquetas();
        }
    }

    const closeModal = () => {
        setShowAlert(!showAlert);
    }

    const setNewArray = (newState) => {
        setProdutosSelecionados((prevState) => [
            ...prevState,
            newState
        ]);
    };/* const produtoExistente = prevState.some(produto => produto.ID === newState.ID);

        if (produtoExistente) {
            return prevState;
        } */

    /* return  []*/

    const groupedProducts = produtosSelecionados.reduce((acc, product) => {
        const foundProduct = acc.find(p => p.ID === product.ID);
        if (foundProduct) {
            foundProduct.quantity += 1;
        } else {
            acc.push({ ...product, quantity: 1 });
        }
        return acc;
    }, []);

    console.log(currentItems);

    /* const groupedProducts = setNewArray.reduce((acc, product) => {
        
    }, []); */

    /* const foundProduct = prevState.find(product => product.id === newState.id && product.name === newState.name);
        if (foundProduct) {
            return prevState.map(product => 
                product.id === newState.id && product.name === newState.name ? { ...product, quantity: product.quantity + 1 } : product
            );
        } else {
            return [...prevState, { ...newState, quantity: 1 }];
        } */

    /* const removeProduct = (index) => {
        setProdutosSelecionados((prevState) => prevState.filter((_, i) => i !== index));
    }  */

    const removeProduct = (id) => {
        setProdutosSelecionados(prevState => {
            const index = prevState.findIndex(produto => produto.ID === id);
            if (index !== -1) {
                const newProdutos = [...prevState];
                newProdutos.splice(index, 1);
                return newProdutos;
            }
            return prevState;
        });
    };

    /* const removeProduct = (id) => {
        setProdutosSelecionados(prevProducts => prevProducts.filter(produto => produto.ID !== id));
    }; */

    const removeAllProducts = () => {
        setProdutosSelecionados([]);
    }

    const handleClick = (index) => {
        setNewArray(currentItems[index]);
    }

    const setEtiquetas = () => {
        updateGlobalState({ etiqueta: produtosSelecionados });
        router.push("/impressaoProdutos");
    }

    console.log(produtosSelecionados);

    return (
        <div className={styles.container}>
            <Alert show={showAlert} handleClose={closeModal} message1={message1} message2={message2} message3={message3} message4={message4} />
            <div style={{ backgroundColor: "#000", padding: 20, justifyContent: 'space-evenly', flexDirection: 'row', display: 'flex' }}>
                <Image src="/logo.png" alt="Logo" width={130} height={40} quality={100} priority={true} />
                {/* <button onClick={handleLogout} style={{ padding: 10}}>Sair</button> */}
                {/* <h1 style={{ color: "#fff", textAlign: "center" }}>Pedidos</h1> */}
            </div>
            <h1 style={{ color: "#000", textAlign: "center", marginTop: 15 }}>Produtos</h1>
            <Sidebar />
            <div className={styles.content}>
                <input
                    type="text"
                    placeholder="Procurar Codigo..."
                    value={value}
                    onChange={handleValue}
                    className={styles.firtsInput}
                />
                <Button valor={value} setLoading={setLoading} />
                <button className={styles.button} onClick={() => handleFilter()}>Busca Avançada</button>
                <button onClick={() => setVisible(true)} className={styles.button}>🛒 {groupedProducts.length}</button>
            </div>
            {filtro && (
                <div className={styles.body}>
                    <div className={styles.filters}>
                        <div className={styles.titleFilters}>
                            <h2 className={styles.title}>Busca Avançada</h2>
                            <div onClick={() => handleFilter()} className={styles.closeButton}>✖️</div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Código</label>
                                <input className={styles.input} name="codigo" value={filters.codigo} onChange={handleFilterChange}></input>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nome</label>
                                <input className={styles.input} name="nome" value={filters.nome} onChange={handleFilterChange}></input>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Código EAN</label>
                                <input className={styles.input} name="codigoEAN" value={filters.codigoEAN} onChange={handleFilterChange}></input>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Número de Série</label>
                                <input className={styles.input} name="numeroSerie" value={filters.numeroSerie} onChange={handleFilterChange}></input>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Marca</label>
                                <input className={styles.input} name="marca" value={filters.marca} onChange={handleFilterChange}></input>
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Categoria</label>
                                <input className={styles.input} name="categoria" value={filters.categoria} onChange={handleFilterChange}></input>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Depósito</label>
                                <input className={styles.input} name="deposito" value={filters.deposito} onChange={handleFilterChange}></input>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Gênero do Produto</label>
                                <select className={styles.select} name="genero" value={filters.genero} onChange={handleFilterChange}>
                                    <option value="0">Selecione</option>
                                    <option value="00 – Mercadoria para Revenda">00 - Mercadoria para Revenda</option>
                                    <option value="01 – Matéria-Prima">01 - Matéria-Prima</option>
                                    <option value="02 – Embalagem">02 - Embalagem</option>
                                    <option value="03 – Produto em Processo">03 - Produto em Processo</option>
                                    <option value="04 – Produto Acabado">04 - Produto Acabado</option>
                                    <option value="05 – Subproduto">05 - Subproduto</option>
                                    <option value="06 – Produto Intermediário">06 - Produto Intermediário</option>
                                    <option value="07 – Material de Uso e Consumo">07 - Material de Uso e Consumo</option>
                                    <option value="08 – Ativo Imobilizado">08 - Ativo Imobilizado</option>
                                    <option value="09 – Serviços">09 - Serviços</option>
                                    <option value="10 – Outros Insumos">10 - Outros Insumos</option>
                                    <option value="99 – Outras">99 - Outras</option>
                                </select>
                            </div>
                            {/* <div className={styles.formGroup}>
                                <label className={styles.label}>Tipo do Produto</label>
                                <select className={styles.select} name="tipoProduto" value={filters.tipoProduto} onChange={handleFilterChange}>
                                    <option value="0">Selecione</option>
                                    <option value="1">Simples</option>
                                    <option value="2">Variação</option>
                                    <option value="3">Variável</option>
                                    <option value="4">Padrão</option>
                                    <option value="5">Pizza</option>
                                </select>
                            </div> */}
                            {/* <div className={styles.formGroup}>
                                <label className={styles.label}>Atributo</label>
                                <input className={styles.input} name="atributo" value={filters.atributo} onChange={handleFilterChange}></input>
                            </div> */}
                        </div>
                        <div className={styles.formRow}>
                            <button className={styles.btnSearch} onClick={() => handleSearch()}>Buscar</button>
                            <button className={styles.btnClear} onClick={() => clearFilters()}>Limpar Filtros</button>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.content}>
                <table className={styles.customTable}>
                    <thead className={styles.Thead}>
                        <tr className={styles.Tr}>
                            <th className={styles.Th}>Nome</th>
                            <th className={styles.Th}>Código</th>
                            <th className={styles.Th}>Preço</th>
                            <th className={styles.Th}>Gênero</th>
                            <th className={styles.Th}>Estoque</th>
                            <th className={styles.Th}>Selecione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems?.map((item, index) => (
                            <tr className={styles.Tr} key={index}>
                                <td className={styles.Th}>{item.Nome}</td>
                                <td className={styles.Th}>{item.Codigo}</td>
                                <td className={styles.Th}>{(item.PrecoVenda).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td className={styles.Th}>{item.Genero}</td>
                                <td className={styles.Th}>{item.EstoqueSaldo}</td>
                                <td className={styles.Th}>
                                    <button className={styles.button} onClick={() => handleClick(index)}>Adicionar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6" className={styles.pagination}>
                                {items && items.length && (
                                    <Pagination
                                        itemsPerPage={itemsPorPagina}
                                        totalItems={items.length}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {
                visible ? (
                    <div className={styles.selectedProducts}>
                        <button onClick={() => setVisible(false)} className={styles.voltar}>◀---</button>
                        <div className={styles.titleListProdutos}>
                            <h3>Produtos Selecionados</h3>
                            <h3>Total Items: {groupedProducts.length}</h3>
                            <button className={styles.buttonThrash} onClick={() => removeAllProducts()}>🗑️</button>
                        </div>
                        <button className={styles.buttonPrint} onClick={() => handlePrint()}>🖨️ Imprimir</button>
                        {produtosSelecionados.length === 0 ? (
                            <p>Nenhum produto selecionado.</p>
                        ) : (
                            <ul>
                                {groupedProducts?.map((produto, index) => (
                                    <div className={styles.produtos} key={index}>
                                        <li className={styles.items}>
                                            {produto.Nome} - {produto.Codigo} - QTDE: {produto.quantity}
                                        </li>
                                        <button className={styles.buttonThrash} onClick={() => removeProduct(produto.ID)}>🗑️</button>
                                    </div>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    <></>
                )
            }

            {/* <Hour /> */}
        </div>
    );
}

export default Produtos;
