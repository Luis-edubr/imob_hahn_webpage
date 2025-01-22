export function casaSearchQuery(keyword) {
    const stringParams = { contains: keyword };
    const numberKeyword = Number(keyword);
    const numberParams = isNaN(numberKeyword) ? undefined : { equals: numberKeyword };

    return {
        where: {
            ativo: true,
            OR: [
                numberParams ? { idcasa: numberParams } : undefined,
                numberParams ? { valor: numberParams } : undefined,
                { cidade: stringParams },
                { bairro: stringParams }
            ].filter(Boolean) // Remove undefined entries
        },
    };
}

export function terrenoSearchQuery(keyword) {
    const stringParams = { contains: keyword };
    const numberKeyword = Number(keyword);
    const numberParams = isNaN(numberKeyword) ? undefined : { equals: numberKeyword };

    return {
        where: {
            ativo: true,
            OR: [
                numberParams ? { idterreno: numberParams } : undefined,
                numberParams ? { valor: numberParams } : undefined,
                { cidade: stringParams },
                { bairro: stringParams },
                { localizacao: stringParams },
                { referencia: stringParams }
            ].filter(Boolean) // Remove undefined entries
        },
    };
}