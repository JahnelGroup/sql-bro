
export {
    asSQL,
    asJSON,
    asCSV
}

function asSQL (result) {
    return `INSERT INTO ${result.table}\n(${result.headers.join(', ')})\nVALUES\n${result.rows.map(row=>'('+row.map(sqlQuote).join(', ')+')').join(',\n')};`
}

function asCSV (result) {
    return `${result.rows.map(row=>row.map(csvQuote).join(', ')).join('\n')};`
}

function asJSON (result) {
    return '[{' + result.rows.map(row=>row.map((el, i) => jsonQuote(result.headers[i]) + ": " + jsonQuote(el)).join(',')).join('},{') + '}]'; 
}

function sqlQuote(val) {
    let newVal = escapeVal(val, quote.bind(null, "'", "''"))
    return newVal ? newVal : 'NULL'
}
function jsonQuote(val) {
    return escapeVal(val, quote.bind(null, '"', '\"'))
}
function csvQuote(val) {
    return escapeVal(val, quote.bind(null, '"', '""'))
}
function quote(sep, replace, val) {
    const reg = new RegExp(sep, 'g')
    return sep + val.replace(reg, replace) + sep
}
function escapeVal(val, quote) {
    switch (typeof val) {
        case "string":
            return quote(val)
        case "number":
            return val
        case "object":
            if (val === null) return null
            if (val instanceof Date) return quote(val.toISOString().split(/[T\.]/).slice(0,2).join(' '))
            break
        default:
            console.log(typeof val)
    }
    return val
}