
const getXMLHttp = () => {
  let XMLHttp = null;
  if (XMLHttpRequest) {
    try {
      XMLHttp = new XMLHttpRequest();
    } catch (e) {}
  } else if (ActiveXObject) {
    try {
      XMLHttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }
  return XMLHttp;
};

onmessage = (event) => {
  const { serial, appUrl } = event.data;
  const getQr = () => {
    const XMLHttp = getXMLHttp();
    XMLHttp.open("GET", `/api/device/qr-code/${serial}`);
    XMLHttp.onreadystatechange = () => {
      if (XMLHttp.readyState === 4) {
        postMessage(XMLHttp.responseText);
      }
    };
    XMLHttp.send();
  };

  setInterval(() => {
    getQr();
  }, 1000);
};
