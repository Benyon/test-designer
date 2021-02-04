<template>
  <div class='footer'>
      <div class="container">
          <div class="footer-panel">
              <div class="col">
                    <strong>Get in Touch</strong>
                    <ul>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Give us feedback</a></li>
                    </ul>
              </div>
              <div class="col">
                    <strong>About</strong>
                    <ul>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">User guides</a></li>
                        <li><a href="#">Forums</a></li>
                        <li><a href="#">Community</a></li>
                    </ul>
              </div>
                <div class="col">
                    <strong>Legal</strong>
                    <ul>
                        <li><a href="#">Terms & Conditioins</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Cookie Policy</a></li>
                    </ul>
              </div>
                <div class="col">
                    <strong>Social</strong>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                    </ul>
              </div>
          </div>
      </div>
  </div>
</template>

<style lang='scss' scoped>

.footer {

    padding: 25px;
    margin-top: 100px;
    border-top: 1px solid rgba(0, 0, 0, .1);
    background-color: white;
    width: 100%;
    height: 258px;

    .container {
        display: grid;
        justify-items: center;
    }

    .footer-panel {
        display: flex; 
        flex-direction: row;
        flex-wrap: wrap;
        width: 75%;
        text-align: center;

        .col {
            width: 25%;
            display: flex;
            flex-direction: column;

            ul {
                margin-top: 1rem;

                a {
                    text-decoration: none;
                }

                li {
                    list-style:none;
                    margin:0;
                    padding: 5px 0px;
                    font-size: 12px;
                    opacity: 0.8;
                }
            }
        }
    }

}

</style>