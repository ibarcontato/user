module.exports = async function debugResult(method) {
  method.then(_then).catch(_catch)

  function _then(result) {
    console.log(` 
      =======================================================
      |                      'SUCCESS'                      |
      =======================================================
    `);
    console.log(JSON.stringify(result, null, 2))
  };


  function _catch(result) {
    console.log(`
      =======================================================
      |                        CATCH                        |
      =======================================================
    `)
    console.log(JSON.stringify(JSON.parse(result), null, 2), '\n\n')
  };
}
