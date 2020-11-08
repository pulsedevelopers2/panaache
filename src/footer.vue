<template>
  <div class="footer">
    <table>
      <tr>
        <th class="d-xs-none, d-sm-none" rowspan="7" />
        <th class="d-xs-none" rowspan="7" />
        <th>Services</th>
        <th>About</th>
        <th>socials</th>
        <th class="d-xs-none" rowspan="7" />
        <th class="d-xs-none, d-sm-none" rowspan="7" />
      </tr>
      <tr>
        <td><h6>Some Services</h6></td>
        <td><h6>About 1</h6></td>
        <td><h6>Socials 1</h6></td>
      </tr>
      <tr>
        <td><h6>Some services 2</h6></td>
        <td><h6>About 2</h6></td>
        <td><h6>socials 2</h6></td>
      </tr>
      <tr>
        <td><h6>Some services 3</h6></td>
        <td><h6>About 3</h6></td>
        <td><h6>socials 3</h6></td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
.footer {
    width: 100vw;
    background: rgb(12, 12, 12);
    display: flex;
    padding: 1%;
    margin-top: 1%;
    position: relative;
    bottom: 0;
    justify-content: center;
    align-items: center;
    text-align: center;
}
table {
    width: inherit;
}

th, td {
    width: 14%;
    text-align: left;
}
</style>