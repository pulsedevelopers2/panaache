<template>
  <div class="solitaire-wrapper row">
    <div class="solitaire-intro col-xs-12">
      <h3> Introducing buy on Chat feature. Because we know buying Jewelz is not so easy </h3>
      <h6> You can now buy solitaire diamonds by talking to Diamond Experts from your favourite platforms </h6>
    </div>
    <div class="features-wrapper col-xs-12">
      <div class="size-wrapper col-xs-12 col-md-4">
        <h4 class="col-xs-12 header">
          Diamond Shape we Provide
        </h4>
        <div class="col-xs-12 shapes row" />
      </div>
      <div class="size-wrapper col-xs-12 col-md-4">
        <h4 class="col-xs-12 header">
          Diamond Shape we Provide
        </h4>
        <div class="size-text row col-xs-12">
          <h3 class="col-xs-12">
            0.01CT - 1.5CT
          </h3>
        </div>
      </div>
      <div class="size-wrapper col-xs-12 col-md-4">
        <h4 class="col-xs-12 header">
          Diamond Shape we Provide
        </h4>
        <div class="size-text row col-xs-12">
          <h3 class="col-xs-6">
            VVS
          </h3>
          <h3 class="col-xs-6">
            VVS-VS
          </h3>
          <h3 class="col-xs-6">
            VS
          </h3>
          <h3 class="col-xs-6">
            SI
          </h3>
        </div>
      </div>
      <div class="size-wrapper col-xs-12 col-md-4">
        <h4 class="col-xs-12 header">
          Diamond Shape we Provide
        </h4>
        <div class="size-text row col-xs-12">
          <h3 class="col-xs-6">
            E-F
          </h3>
          <h3 class="col-xs-6">
            F-G
          </h3>
          <h3 class="col-xs-6">
            G-H
          </h3>
          <h3 class="col-xs-6">
            H-I
          </h3>
        </div>
      </div>
    </div>
    <button class="red">
      Whatsapp
    </button>
  </div>
</template>
<style scoped>
.solitaire-wrapper {
    justify-content: center;
    text-align: center;
}
.solitaire-intro {
    padding: 4%;
}

.size-wrapper {
    min-height: 30vh;
}
.size-text {
    min-height: inherit;
    display: inline-block;
}
.header {
    background-color: rgb(78, 0, 0);
    padding: 1%;
}
.solitaire-intro {
    height: 30vmax;
    background: url('https://miro.medium.com/max/2898/1*f7qq7QZeyQzYF0RTxzPhkg.jpeg');
    background-clip: no-clip;
    background-size: cover;
}
@media screen and (orientation: portrait) {
.solitaire-intro h3 {
    font-size: 100%;
}
.solitaire-intro h6 {
    font-size: 80%;
}

}
</style>