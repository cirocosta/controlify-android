function getDiffsInDates (d) {
    var N = d.length;
    var result = [];

    for (var i=1; i < N; i++) {
        result.push(d[i].getTime() - d[i-1].getTime());
    }

    return result;
}
