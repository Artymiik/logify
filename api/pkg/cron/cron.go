package cron

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/Artymiik/logify/services/transaction"
	"github.com/robfig/cron/v3"
)

func StartCron(db *sql.DB) error {
	store := transaction.NewStore(db)
	c := cron.New(cron.WithSeconds())

	_, err := c.AddFunc("0 0 * * * *", store.UpdateBalanceAllUsers)
	if err != nil {
		return err
	}

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go func() {
		c.Run()
	}()

	<-ctx.Done()
	fmt.Println("Server close.")
	return nil
}
