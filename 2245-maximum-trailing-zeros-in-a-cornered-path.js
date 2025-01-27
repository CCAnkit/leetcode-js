/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxTrailingZeros = function(grid) {
    const g = grid
    const m = g.length;
    const n = g[0].length;
    const ta = [...Array(m)].map(i => Array(n).fill(1));
    const tb = [...Array(m)].map(i => Array(n).fill(1));
    const tc = [...Array(m)].map(i => Array(n).fill(1));
    const td = [...Array(m)].map(i => Array(n).fill(1));
    
    const c52 = (s) => {
        let c5 = 0;
        let c2 = 0;
        while (s % 2 === 0) {
            s = s / 2;
            c2++;
        }
        while (s % 5 === 0) {
            s = s / 5;
            c5++;
        }
        return [c5, c2];
    }
    
    const c10 = ([c5, c2]) => {
        return Math.min(c5, c2);
    }
    
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            ta[i][j] = (j === 0) ? c52(g[i][j]) : [c52(g[i][j])[0] + ta[i][j-1][0], c52(g[i][j])[1] + ta[i][j-1][1]];
            tb[i][j] = (i === 0) ? c52(g[i][j]) :  [c52(g[i][j])[0] + tb[i-1][j][0], c52(g[i][j])[1] + tb[i-1][j][1]];
        }
    }
    
    for (let i = m-1; i >= 0; i--) {
        for (let j = n-1; j >= 0; j--) {
            tc[i][j] = (j === n-1) ? c52(g[i][j]) : [c52(g[i][j])[0] + tc[i][j+1][0], c52(g[i][j])[1] + tc[i][j+1][1]];  // : ctz(hg(g[i][j]) * tc[i][j+1][0], tc[i][j+1][1]); // hg(g[i][j]) * tc[i][j+1];
            td[i][j] = (i === m-1) ? c52(g[i][j]) : [c52(g[i][j])[0] + td[i+1][j][0], c52(g[i][j])[1] + td[i+1][j][1]]; // : ctz(hg(g[i][j]) * td[i+1][j][0], td[i+1][j][1]); // hg(g[i][j]) * td[i+1][j];
        }
    }
    
    let ret = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let s1 = i === 0 ? c10(ta[i][j]) : c10([ta[i][j][0] + tb[i-1][j][0], ta[i][j][1] + tb[i-1][j][1]]);
            let s2 = i === m - 1 ? c10(ta[i][j]) : c10([ta[i][j][0] + td[i+1][j][0], ta[i][j][1] + td[i+1][j][1]]);            
            let s3 = i === 0 ? c10(tc[i][j]) : c10([tc[i][j][0] + tb[i-1][j][0], tc[i][j][1] + tb[i-1][j][1]]);
            let s4 = i === m - 1 ? c10(tc[i][j]) : c10([tc[i][j][0] + td[i+1][j][0], tc[i][j][1] + td[i+1][j][1]]); 
            ret = Math.max(ret, s1, s2, s3, s4);
        }
    }
    return ret;
};
