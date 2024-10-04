build:
	@go build -o bin/logify-server main.go

test:
	@go test -v ./...

run: build
	@./bin/logify-server

migration:
	@migrate create -ext sql -dir cmd/migrate/migrations $(filter-out $@,$(MAKECMDGOALS))

migrate-up:
	@go run cmd/migrate/main.go up

migrate-down:
	@go run cmd/migrate/main.go down
