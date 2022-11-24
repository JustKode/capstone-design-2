FROM golang:alpine AS builder
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

WORKDIR /build
COPY . ./
RUN go mod download
RUN go build -o server .
WORKDIR /dist
RUN cp /build/server .

FROM scratch
COPY --from=builder /dist/server .
ENTRYPOINT ["/server"]
EXPOSE 8001