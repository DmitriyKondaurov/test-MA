runCalc = (event) => {
    event.preventDefault();
    let pandemicStartMap = '';
    let pandemicEndMap = Array(19);
    let oceanBorder = [0, 18];
    let total = 19, infAmount = 0;
    for (let i = 1; i < 20; i++) {
        const fieldIn = 'fieldIn-'.concat(i.toString());
        const fieldOut = 'fieldOut-'.concat(i.toString());
        const val = document.getElementById(fieldIn).value;
        if (val === '0') {
            document.getElementById(fieldOut).style.backgroundColor = 'lightgreen';
            pandemicEndMap[i - 1] = 0;
            pandemicStartMap = pandemicStartMap.concat(val);
        } else if (val === 'X') {
            document.getElementById(fieldOut).style.backgroundColor = 'lightskyblue';
            pandemicEndMap[i - 1] = 'X';
            oceanBorder.splice(oceanBorder.length - 1, 0, i - 1 );
            total--;
            pandemicStartMap = pandemicStartMap.concat(val);
        } else {
            document.getElementById(fieldOut).style.backgroundColor = 'lightcoral';
            pandemicEndMap[i - 1] = 1;
            pandemicStartMap = pandemicStartMap.concat(val);
        }
    }
    for (let i = 0; i < oceanBorder.length - 1; i++) {
        if (pandemicStartMap.slice(oceanBorder[i], oceanBorder[i + 1]).includes('1') ) {
            if(oceanBorder[i] === 0) {
                pandemicEndMap[0] = 1;
                infAmount++;
            }
            if(i + 1 === oceanBorder.length - 1) {
                pandemicEndMap[pandemicEndMap.length - 1] = 1;
                infAmount++;
            }
            pandemicEndMap = pandemicEndMap.map((item, index) => {
                if(index > oceanBorder[i] && index < oceanBorder[i + 1]) {
                    infAmount++;
                    return 1;
                } else return item
            });

        }
    }
    for (let i = 1; i < 20; i++) {
        const fieldRes = 'fieldRes-'.concat(i.toString());
        const resVal = pandemicEndMap[i - 1];
        if (resVal === 0) {
            document.getElementById(fieldRes).style.backgroundColor = 'lightgreen';
        } else if (resVal === 'X') {
            document.getElementById(fieldRes).style.backgroundColor = 'lightskyblue';
        } else {
            document.getElementById(fieldRes).style.backgroundColor = 'lightcoral';
        }
    }
    document.getElementById('total').innerHTML = total.toString();
    document.getElementById('infected').innerHTML = infAmount.toString();
    document.getElementById('percentage').innerHTML = (infAmount / total * 100 + '%');
};
document.getElementById('run').addEventListener('click', runCalc);
