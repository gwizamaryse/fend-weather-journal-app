/* Global Variables */
// US is default country. Parameter is zip code,country code
const url = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=";
const apiKey = "&APPID=b55b7da31ee497fba7aa65fad2797708";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();
let newTime = d.getHours()+':'+ d.getMinutes();
const getRecords = async (url = '') => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

// POST Data
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
          // Body data type must match "Content-Type" header
        body: JSON.stringify(data)
        });
        try {
          const newData = await response.json();
          return newData;
        }catch(error) {
        console.log("error", error)
        }
};

const generateData = async () => {
  const feelings = document.getElementById('feelings').value;
  const zip = document.getElementById('zip').value;
  const response = await fetch(`${url}${zip}${apiKey}`);
  try {
      const responseData = await response.json();
      responseData.feelings = feelings;
      responseData.date = newDate;
      await postData('/', responseData);
      updateUI();
  } catch (error) {
      console.error("error", error);
  }
};

const updateUI = async () => {
    const projectData = await getRecords('/getRecords');
    document.getElementById('date').innerHTML = `Today's Date is: ${projectData.date}`;
    document.getElementById('temp').innerHTML = `The Temperature is ${projectData.temperature} &#8457` + ` in ${projectData.name}`;
    document.getElementById('content').innerHTML = `Current feeling is: ${projectData.feelings}`;
    document.getElementById('end').innerHTML = `To check weather in another city, simply enter the city's zip code, Thank you!!!!`;
};



document.getElementById('button').addEventListener('click', generateData);