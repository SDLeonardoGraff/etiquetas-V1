import React, { useState } from "react";
import escolherOpcao from "@/hooks/useEscolha";

const Select = () => {
    const [selectValue, setSelectValue] = useState("");
    
    const handleValue = (event) => {
        setSelectValue(event.target.value);
        escolherOpcao(event.target.value);
    };
    
    return (
        <div>
        <select name="selectForm" id="select" value={selectValue} onChange={handleValue}>
            <option value="0">0- Medida 10 X 3 - 01</option>
            <option value="1">1- Medida 10 X 4 - 01</option>
            <option value="2">2- Medida 10 x 5 - 01</option>
            <option value="3">3- Medida 104 x 84 - 01</option>
            <option value="4">4- Medida 100 x 150 - 01</option>
            <option value="5">5- Medida 40 x 40 - 02</option>
            <option value="6">6- Medida 50 x 30 - 02</option>
            <option value="7">7- Medida 30 x 15 - 03</option>
            <option value="8">8- Medida 33 x 22 - 03</option>
            <option value="9">9- Medida 33 x 25 - 03</option>
            <option value="10">10- Template 10 X 15</option>
            <option value="11">11- Etiqueta Mode 1</option>
            <option value="12">12- Etiqueta Mode 2</option>
            <option value="" selected></option>
        </select>
        <p>Valor Selecionado: {selectValue}</p>
        </div>
    )
}

export default Select;