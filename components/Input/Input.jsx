import { useState, useEffect } from "react";
import './input.css';
import Button from "../button/Button";
import { useGlobalContext } from "@/context/GlobalContext";

const Input = ({setLoading}) => {
    const [value, setValue] = useState("");
    const [filterType, setFilterType] = useState("codigo");
    const [url, setUrl] = useState("");
    const { globalState, updateGlobalState } = useGlobalContext();

    const handleValue = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        updateUrl(filterType, newValue);
    };

    const handleFilterChange = (event) => {
        setValue('');
        updateGlobalState({pedido: []});
        const opcao = event.target.value;
        setFilterType(opcao);
        updateUrl(opcao, value);
    };

    const updateUrl = (filter, val) => {
        let newUrl = `/api/request/Pedidos/Pesquisar?${filter}=${val}`;
        setUrl(newUrl);
    };

    useEffect(() => {
        updateUrl(filterType, value);
    }, [filterType, value]);

    return (
        <div className="content">
            <select onChange={handleFilterChange} className="filter-select">
                <option value='codigo'>Código</option>
                <option value='cliente'>Cliente</option>
                <option value='numeroNFe'>Número NFe</option>
                <option value='categoria'>Categoria</option>
            </select>
            <input
                type="text"
                placeholder="Procurar Pedidos..."
                value={value}
                onChange={handleValue}
                className="filter-input"
            />
            <Button valor={value} url={url} val={value} setLoading={setLoading}/>
        </div>
    );
}

export default Input;
