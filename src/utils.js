export const getRandomColor = () => {
    return  "0x"+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

export const getRandomInRange =(min, max) =>{
    return Math.random() * (max - min) + min;
}