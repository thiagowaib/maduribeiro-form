const pingServer = async () => {
    try {
      fetch("https://mapi-kw50.onrender.com/ping", {
        method: "GET",
        headers: {
            "auth": "9f6a6095bc6158b2b189eb009fe6b44d"
        }
      });
      console.log("Ping!")
    } catch (error:any) {
      console.error({error});
    }
}

window.onload = pingServer;