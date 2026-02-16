export const getPercentAndColor = (value: number) => {

    const percent = Math.round((value / 10) * 100)
    let backgroundColor = '#e74c3c'
    if (percent >= 70) {
        backgroundColor = '#2ecc71'
    } else if (percent >= 50) {
        backgroundColor = '#f39c12'
    }
    return {percent, backgroundColor}
}