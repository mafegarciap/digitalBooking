const getCities = async () =>{
    const url="http://localhost:8080/cities/list";
    const res = await fetch(url);
    const cities = await res.json();

    return cities;
}

export default getCities;