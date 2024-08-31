build:
	@go build -o bin/logify-server main.go

test:
	@go test -v ./...

run: build
	@./bin/logify-server
