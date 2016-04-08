# `hca-rest-soap-connector`

Hacked from examples at Strongloop github.

## Example 1 - from Strongloop github (works)

To expose REST APIs to proxy the SOAP web services, run:

```
node weather-rest
```

then browse to [http://localhost:3000/explorer](http://localhost:3000/explorer)

## Example 2 - simple Java SOAP server access (semi-works)

### To start a simple soap server, run:

javac -d . *.java
java wsserver/ServiceStarter

### To expose REST APIs to proxy the SOAP web services, run:

```
node hello-rest
```

### Browse to [http://localhost:3000/explorer](http://localhost:3000/explorer)

### Example 3 - access internal VA/VOA SOAP endpoint (doesn't work)

To expose REST APIs to proxy the SOAP web services, run:

```
node voa-rest
```

then browse to [http://localhost:3000/explorer](http://localhost:3000/explorer)
