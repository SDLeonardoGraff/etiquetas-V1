const escolherOpcao = (opcao) => {
    let frase;

    let client = {
        nome: opcao.Cliente,
        codigo: opcao.Codigo,
        cpf: opcao.ClienteCNPJ,
        logradouro: opcao.Logradouro,
        logradouroComp: opcao.LogradouroComplemento,
        logradouroNum: opcao.LogradouroNumero,
        uf: opcao.UF,
        cep: opcao.CEP,
        bairro: opcao.Bairro,
        municipio: opcao.Municipio,
    };

    const isMostlyFilled = (obj) => {
        const entries = Object.entries(obj);
        const filledEntries = entries.filter(([key, value]) => value !== null && value !== undefined && value !== "");

        const filledCount = filledEntries.length;
        const totalCount = entries.length;

        return filledCount > totalCount / 2;
    }

    if (isMostlyFilled(client)) {
        console.clear();
        console.log("A maioria das informações estão preenchidas.");
        return true;
    } else {
        console.clear();
        //alert("A maioria das informações não está preenchida.\nEtiqueta não pode ser gerada!"); 
        return false;
    } 
}

export default escolherOpcao;