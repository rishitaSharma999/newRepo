import axios from "axios"

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => { //new function api connector with parameters
    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data: bodyData ? bodyData : null,
        headers: headers ? headers: null,
        params: params ? params : null,
    });
}

{/* HTTP (Hypertext Transfer Protocol) requests are the foundation of communication between a client (usually a web browser) and a server on the internet. They allow clients to request resources, such as web pages, images, or data, from a server, and for the server to respond with the requested resources. */}
{/* GET: Retrieve a resource from the server.
POST: Send data to the server to create a new resource.
PUT: Update an existing resource on the server.
DELETE: Delete a resource from the server.
*/}
//The axios.create() method returns a new instance of Axios with a default configuration. In this case, the configuration is an empty object {}, which means that the instance will use the default Axios settings.
{/*When you call the apiConnector function, it doesn't return the actual response from the server immediately. Instead, it returns a promise.

A promise is a result object that is used to handle asynchronous operations. It represents a value that may not be available yet, but will be resolved at some point in the future. */}
{/*When the Axios request is complete, the promise is resolved, which means it's fulfilled, and the response from the server is available. */}
{/*The response from the server is the actual data that was requested, such as JSON data, an HTML page, or an image. */}

{/*When a server responds to a request, it includes a set of headers that provide additional information about the response. One of these headers is called Content-Type, which specifies the format of the response body. In this case, the Content-Type header will be set to application/json, which tells the client (e.g., a web browser or mobile app) that the response body contains JSON data. */}