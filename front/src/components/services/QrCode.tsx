import axios from "axios";
import React from "react";
import $ from "jquery";

const QrCode = () => {
  const BASE_URL = "https://deu.wablas.com";
  const changeLang = (e: any) => {
    window.location.href = BASE_URL + "/" + e.value;
  };

  const app_url = "https://deu.wablas.com";
  let s: any;
  let intervalID: any = null;
  let sec = 15;
  function qr_code() {
    $("#generate")
      .prop("disabled", true)
      .html("<i className='fas fa-sync fa-spin'></i> Loading...");
    const serial = $("#serial").val();
    axios
      .get(`${app_url}/api/device/reset-qr-code/${serial}`)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });

    if (typeof Worker !== "undefined") {
      if (typeof s == "undefined") {
        s = new Worker("https://deu.wablas.com/js/qrcode.js");
        s.postMessage({ serial: serial, app_url: app_url });
      }
      s.onmessage = function (event: any) {
        if (event.data != "wait") {
          var data = JSON.parse(event.data);
          if (data.message == "success" && data.text != "") {
            $("#qrcode").attr("src", data.image);

            intervalID = setInterval(function () {
              if (sec == 0) {
                stopWorker();
                clearInterval(intervalID);
                intervalID = null;
                sec = 30;
                location.reload();
              }
              sec--;
            }, 40000);
          } else {
            $("#qrcode").attr("src", "/assets/images/wa.webp");
          }

          if (
            data.message == "success" &&
            data.text == "" &&
            data.is_ready == 1
          ) {
            stopWorker();
            location.reload();
          }
        }
        //
      };
    } else {
      document.getElementById("qr")!.innerHTML =
        "Maaf, tidak support web worker!";
    }
  }

  function stopWorker() {
    s.terminate();
    s = undefined;
    $("#qrcode").attr("src", "/assets/images/wa.webp");
    $("#generate").prop("disabled", false).html("Generate Qr Code");
  }

  function count_down() {
    // Set the date we're counting down to
    let countDownDate = Math.floor(new Date().getTime() / 1000) + 46; // 45 second after now

    // Update the count down every 1 second
    let x = setInterval(function () {
      let now = Math.floor(new Date().getTime() / 1000); // Get time's now

      // Find the distance between now and the count down time
      let distance = countDownDate - now;

      let seconds = Math.floor(distance % (1000 * 60)); // Calculations for seconds

      document.getElementById("timer")!.innerHTML =
        "Qr Code will be expired in " + seconds + " second"; // Output the result

      // Disable onclick when count down is running
      document.getElementById("generate")!.onclick = null;

      // Action when count down is over
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer")!.innerHTML =
          "Qr Code is expired. Generate again!";

        // Enable onclick when count down is over
        document
          .getElementById("generate")!
          .setAttribute("onclick", "qr_code(); count_down()");
      }
    }, 1000);
  }

  return (
    <section>
      <div className="card-body">
        <form className="needs-validation" method="post" action="#">
          <input type="hidden" name="_token" value="" />
          <div className="row p-t-20">
            <div className="col-md-6">
              <div className="card">
                <input type="hidden" name="serial" id="serial" value="2TLOPF" />
                <img
                  className="card-img-top img-responsive"
                  id="qrcode"
                  src="/assets/images/wa.webp"
                  alt="Card image cap"
                />
                <div className="card-body">
                  <p className="card-text">
                    The qr code image will appear here, make sure you have
                    joined WhatsApp Multi Device
                  </p>
                  <a
                    href="javascript:void(0)"
                    onClick={qr_code}
                    className="btn btn-secondary"
                    id="generate"
                  >
                    <i className=" icons-QR-Code"></i> Generate Qr Code
                  </a>
                  <div id="timer" className="mt-2"></div>
                  <div>
                    The WhatsApp number used for scanning must be at least 3
                    days old and actively used for chatting to prevent it from
                    being blocked as a bot.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
export default QrCode;
