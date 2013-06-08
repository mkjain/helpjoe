function auth () {
    $.ajax({
        type : "GET",
        url : "https://global.telekom.com/gcp-web-api/oauth?response_type=code&client_id=d8d8cc8f881eae4fb7d8d8b17ff14ede-1ea30494bcbe996c623df4e4e79ffc68-cd3e689c624993dd9a9a01072cc8f37e&scope=sandbox&redirect_uri=http://mkjain.github.io/helpjoe/"
    });  
}