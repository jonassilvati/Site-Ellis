<script setup>
</script>

<template>
    <footer class="footer" data-node-id="81:335">
        <div class="container">
            <div class="row">
                <div class="row justify-content-center justify-content-lg-start align-items-start" style="gap: var(--gap-horizontal);">
                    <div class="col-auto">
                        <div class="social-links">
                            <a href="https://www.instagram.com/ellisstudiobr/"><i class="fa-brands fa-instagram"></i></a>
                            <a href="https://www.behance.net/ellisstudiobr"><i class="fa-brands fa-behance"></i></a>
                            <a href="https://www.linkedin.com/company/ellisstudiobr/"><i class="fa-brands fa-linkedin"></i></a>
                        </div>
                    </div>

                    <div class="col-auto">
                        <div class="d-flex flex-column align-items-start" style="gap: var(--gap-vertical);">
                            <span class="copyright"><i class="fa-regular fa-copyright"></i> {{ new Date().getFullYear() }}. Éllis Studio & Co.</span>
                            <span class="copyright">Todos os Direitos Reservados.</span>
                        </div>
                    </div>

                    <div class="col-auto">
                        <div class="d-flex flex-column align-items-start" style="gap: var(--gap-vertical);">
                            <span class="txt">Agende uma call</span>
                            <a href="mailto:ola@ellisstudio.com.br">ola@ellisstudio.com.br</a>
                        </div>
                    </div>

                    <div class="col-auto">
                        <div class="d-flex flex-column align-items-start" style="gap: var(--gap-vertical);">
                            <a href="">Trabalhe conosco</a>
                            <a href="">Políticas de Privacidade</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img class="logo-footer" src="/images/ellis-logo-footer.svg" alt="Ellis">
    </footer>
</template>

<style lang="scss" scoped>
.footer {
    background-color: #14222a;
    color: #fff;
    padding-top: 115px;
    padding-bottom: 47px;
    --gap-vertical: 15px;
    --gap-horizontal: 90px;

    .txt,
    a{
        color: #FFF;
        font-family: Sora;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-decoration: none;
    }

    .social-links{
        display: flex;
        gap: 20px;
        align-items: center;
        a{
            color: #fff;
            font-size: 36px;
        }
    }
    
    .copyright{
        font-size: 20px;
        font-weight: 400;
        line-height: normal;
        color: #B7C0C7;
    }
}

.logo-footer{
    width:100%;
    max-width: calc(100% - 50px);
    height: auto;
    margin-top: 90px;
    display: block;
    margin-left: auto;
    margin-right: auto;

    @media screen and (min-width: 1920px){
        max-width: calc(100% - 100px)
    }
}
</style>