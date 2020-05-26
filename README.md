# About
[React: Intro to web dev](https://www.youtube.com/watch?v=KcyGr_onNiM&feature=youtu.be)

## Steps
1. Create API key: https://api.nasa.gov/
2. Clone, install, start:
  ```
  git clone https://github.com/gcunhase/spaceappscovid2019.git
  cd spaceappscovid2019/
  npm install
  npm start
  ```

## My modifications
* Logo and title (`public/index.html`)
* Image filtering:
  * [Search bar](https://www.npmjs.com/package/react-search-box) for camera type
    > DONE, but no results are found
    ```
    npm i react-search-box --save
    ```
  * [Date picker](https://reactdatepicker.com/)
    ```
    npm install date-fns --save
    npm install react-datepicker --save
    ```
    * Old one: [Calendar picker](https://www.npmjs.com/package/react-date-range)
    ```
    //<Calendar
    //  date={new Date()}
    //  onChange={() => console.log('Calendar')}
    ///>
    ```

## Acknowledgements
* [Original code](https://github.com/BrandonEscamilla/spaceappscovid2019)
* [Logo](https://www.freepik.com/premium-vector/rocket-logo-vector_3863695.htm) [[JPG to ICO](https://onlineconvertfree.com/)]
