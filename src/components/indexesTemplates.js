export const indexesMigrationTemplate = function(
    sourceMigration, // DAMRES5
    targetMigration, // DAMRES
    edadName, // EDAD
    title, // Indicadores Totales para Migracion Interna Reciente | DAM
    indexNumber,
    filterText,
    outputNameJSON
) {
    const formatedText = `
    TABLE DR_RESHAB_${indexNumber}
    FREQ ${targetMigration}
    FILTER ${edadName} > 4 AND ${sourceMigration} > 0 AND ${targetMigration} > 0 ${filterText !== '' ? 'AND (' + filterText + ')' : ''}
    TITLE \\"Residencia habitual\\"

    TABLE DR_RESREC_${indexNumber}
    FREQ ${sourceMigration}
    FILTER ${edadName} > 4 AND ${sourceMigration} > 0 AND ${targetMigration} > 0 ${filterText !== '' ? 'AND (' + filterText + ')' : ''}
    TITLE \\"Residencia hace 5 años\\"

    TABLE DR_NOMIGRA_${indexNumber}
    FREQ ${targetMigration}
    FILTER (${sourceMigration} = ${targetMigration})
    TITLE \\"No Migrantes\\"

    TABLE DR_INMIG_${indexNumber}
    TABOP DR_RESHAB_${indexNumber} - DR_NOMIGRA_${indexNumber}
    TITLE \\"Inmigrantes\\"

    TABLE DR_EMIG_${indexNumber}
    TABOP DR_RESREC_${indexNumber} - DR_NOMIGRA_${indexNumber}
    TITLE \\"Emigrantes\\"

    TABLE DR_MIGNETA_${indexNumber}
    TABOP DR_INMIG_${indexNumber} - DR_EMIG_${indexNumber}
    TITLE \\"Migracion Neta\\"

    TABLE DR_MIGBRUTA_${indexNumber}
    TABOP DR_INMIG_${indexNumber} + DR_EMIG_${indexNumber}
    TITLE \\"Migracion Bruta\\"

    TABLE DR_TASAINMI_${indexNumber}
    TABOP ((DR_INMIG_${indexNumber} / 5) / ((DR_RESHAB_${indexNumber} + DR_RESREC_${indexNumber})/2))*1000
    decimals 2
    TITLE \\"Tasa de Inmigracion\\"

    TABLE DR_TASAEMI_${indexNumber}
    TABOP ((DR_EMIG_${indexNumber} / 5) / ((DR_RESHAB_${indexNumber} + DR_RESREC_${indexNumber}) / 2))*1000
    decimals 2
    TITLE \\"Tasa de Emigracion\\"

    TABLE DR_TASAMIG_${indexNumber}
    TABOP DR_TASAINMI_${indexNumber} - DR_TASAEMI_${indexNumber}
    decimals 2
    TITLE \\"Tasa de Migracion Neta\\"

    TABLE DR_EFICACIA_${indexNumber}
    TABOP DR_MIGNETA_${indexNumber} / DR_MIGBRUTA_${indexNumber}
    decimals 2
    TITLE \\"Índice de Eficacia Migratoria\\"

    TABLELIST DAM, DR_RESHAB_${indexNumber}, DR_RESREC_${indexNumber}, DR_NOMIGRA_${indexNumber}, DR_INMIG_${indexNumber}, DR_EMIG_${indexNumber}, DR_MIGNETA_${indexNumber}, DR_MIGBRUTA_${indexNumber}, DR_TASAINMI_${indexNumber}, DR_TASAEMI_${indexNumber}, DR_TASAMIG_${indexNumber}, DR_EFICACIA_${indexNumber}
    title \\"${title}\\"
    OUTPUTFILE JSON \\"${outputNameJSON}.json\\" OVERWRITE
    `;

    return (formatedText);
}

export const indexesMobilityTemplate = function (indexNumber, filterText, outputNameJSON) {

    const formatedText =`
    TABLE RES_HAB_${indexNumber}
    FREQ DAMERES
    FILTER DAMEMCOT > 0 ${filterText && 'AND ' + filterText}
    TITLE \\"Residencia habitual según condición de movilidad\\"

    TABLE RES_MCOT_${indexNumber}
    FREQ DAMEMCOT
    ${filterText && 'FILTER ' + filterText}
    TITLE \\"Lugar de movilidad\\"

    TABLE RES_QUEDAN_${indexNumber}
    FREQ DAMEMCOTM
    ${filterText && 'FILTER ' + filterText}
    TITLE \\"Residentes sin movilidad\\"

    TABLE RES_SALEN_${indexNumber}
    FREQ DAMEMCOTD
    ${filterText && 'FILTER ' + filterText}
    TITLE \\"Residentes que salen\\"

    TABLE RES_LLEGAN_${indexNumber}
    TABOP RES_MCOT_${indexNumber} - RES_QUEDAN_${indexNumber}
    TITLE \\"No residentes que llegan\\"

    TABLE SAL_MOVIL_${indexNumber}
    TABOP RES_MCOT_${indexNumber} - RES_HAB_${indexNumber}
    TITLE \\"Saldo de Móviles\\"

    TABLE REL_MOVIL_${indexNumber}
    TABOP RES_MCOT_${indexNumber} / RES_HAB_${indexNumber}
    TITLE \\"Relación móviles / residentes\\"

    TABLE REL_SAL_MOV_${indexNumber}
    TABOP ( SAL_MOVIL_${indexNumber} / RES_HAB_${indexNumber} ) * 100
    TITLE \\"Relación saldo / residentes\\"

    TABLE REL_QUEDAN_${indexNumber}
    TABOP RES_QUEDAN_${indexNumber} / RES_HAB_${indexNumber}
    TITLE \\"Relación residentes sin movilidad / residentes\\"

    TABLE REL_SALEN_${indexNumber}
    TABOP RES_SALEN_${indexNumber} / RES_HAB_${indexNumber}
    TITLE \\"Relación residentes que salen / residentes\\"

    TABLE REL_LLEGAN_${indexNumber}
    TABOP RES_LLEGAN_${indexNumber} / RES_HAB_${indexNumber}
    TITLE \\"Relación no residentes que llegan / residentes\\"

    TABLELIST DAME,RES_HAB_${indexNumber}, RES_MCOT_${indexNumber}, RES_QUEDAN_${indexNumber}, RES_SALEN_${indexNumber}, RES_LLEGAN_${indexNumber}, SAL_MOVIL_${indexNumber}, REL_MOVIL_${indexNumber}, REL_SAL_MOV_${indexNumber}, REL_QUEDAN_${indexNumber}, REL_SALEN_${indexNumber}, REL_LLEGAN_${indexNumber}
    title \\"Indicadores de Movilidad Cotidiana\\"
    OUTPUTFILE JSON \\"${outputNameJSON}\\" OVERWRITE
    `;

    return (formatedText);
}