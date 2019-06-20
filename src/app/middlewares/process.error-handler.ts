export  function processPromiseErrorHandler(error: any, p: any) {
  console.log("Unhandled Rejection1:", error.stack);
  // process.exit(1);
}
export  function processErrorHandler(error: any) {
  console.log("Unhandled Error1:", error.stack);
    // process.exit(1);
}
