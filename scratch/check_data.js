const fs = require('fs');
const data = JSON.parse(fs.readFileSync('d:/uni2insigth/data/universities.json', 'utf8'));

const ids = data.map(u => u.id);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

console.log('Duplicate IDs:', duplicateIds);

data.forEach(u => {
    if (u.city === 'TP. Hải Phòng' && u.address.includes('TP Hồ Chí Minh')) {
        console.log(`Potential city/address mismatch for ${u.id}: City=${u.city}, Address=${u.address}`);
    }
    
    if (u.region === 'Miền Nam' && u.city === 'Hà Nội') {
        console.log(`Potential region/city mismatch for ${u.id}: Region=${u.region}, City=${u.city}`);
    }

    if (u.region === 'Miền Bắc' && u.city === 'TP. Hồ Chí Minh') {
        console.log(`Potential region/city mismatch for ${u.id}: Region=${u.region}, City=${u.city}`);
    }
});
