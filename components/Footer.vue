<template>
  <footer class="footer">
    <div class="container">
      <p class="copyright text-light text-center">@2019 by tianyong90</p>
    </div>

    <div class="d-flex flex-row justify-content-center">
      <a class="link" href="https://github.com/tianyong90" target="_blank">
        <i class="icon iconfont icon-github"></i>
      </a>
      <a class="link" href="https://weibo.com/1707227001" target="_blank">
        <i class="icon iconfont icon-weibo"></i>
      </a>
      <a class="link" href="https://twitter.com/tianyong901" target="_blank">
        <i class="icon iconfont icon-twitter"></i>
      </a>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  padding: 50px 0 20px;
  background-color: #263238;
  clip-path: polygon(0 0, 50% 3vw, 100% 0, 100% 100%, 0 100%);
}

.link {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  background-color: #fff;
  color: #263238;
  margin: 0 0.1rem;
  text-decoration: none;
  outline: none;
  clip-path: polygon(
    47.5% 5.66987%,
    48.2899% 5.30154%,
    49.13176% 5.07596%,
    50% 5%,
    50.86824% 5.07596%,
    51.7101% 5.30154%,
    52.5% 5.66987%,
    87.14102% 25.66987%,
    87.85495% 26.16978%,
    88.47124% 26.78606%,
    88.97114% 27.5%,
    89.33948% 28.2899%,
    89.56505% 29.13176%,
    89.64102% 30%,
    89.64102% 70%,
    89.56505% 70.86824%,
    89.33948% 71.7101%,
    88.97114% 72.5%,
    88.47124% 73.21394%,
    87.85495% 73.83022%,
    87.14102% 74.33013%,
    52.5% 94.33013%,
    51.7101% 94.69846%,
    50.86824% 94.92404%,
    50% 95%,
    49.13176% 94.92404%,
    48.2899% 94.69846%,
    47.5% 94.33013%,
    12.85898% 74.33013%,
    12.14505% 73.83022%,
    11.52876% 73.21394%,
    11.02886% 72.5%,
    10.66052% 71.7101%,
    10.43495% 70.86824%,
    10.35898% 70%,
    10.35898% 30%,
    10.43495% 29.13176%,
    10.66052% 28.2899%,
    11.02886% 27.5%,
    11.52876% 26.78606%,
    12.14505% 26.16978%,
    12.85898% 25.66987%
  );
}
</style>
