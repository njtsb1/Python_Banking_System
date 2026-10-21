def main():
    menu = """
[d] Deposit
[s] Withdraw
[e] Statement
[q] Quit

=> """

    balance = 0.0
    limit = 500.0
    statement = ""
    number_of_withdrawals = 0
    WITHDRAWAL_LIMIT = 3

    while True:
        option = input(menu).strip().lower()

        if option == "d":
            try:
                amount = float(input("Enter the deposit amount: "))
                if amount > 0:
                    balance += amount
                    statement += f"Deposit: R$ {amount:.2f}\n"
                    print(f"Success! Deposited R$ {amount:.2f}.")
                else:
                    print("Operation failed! The entered amount is invalid.")
            except ValueError:
                print("Operation failed! Please enter a valid numeric value.")

        elif option == "s":
            try:
                amount = float(input("Enter the withdrawal amount: "))
                
                exceeded_balance = amount > balance
                exceeded_limit = amount > limit
                exceeded_withdrawals = number_of_withdrawals >= WITHDRAWAL_LIMIT

                if exceeded_balance:
                    print("Operation failed! You do not have sufficient balance.")
                elif exceeded_limit:
                    print("Operation failed! The withdrawal amount exceeds the limit.")
                elif exceeded_withdrawals:
                    print("Operation failed! Maximum number of withdrawals exceeded.")
                elif amount > 0:
                    balance -= amount
                    statement += f"Withdrawal: R$ {amount:.2f}\n"
                    number_of_withdrawals += 1
                    print(f"Success! Withdrew R$ {amount:.2f}.")
                else:
                    print("Operation failed! The entered amount is invalid.")
            except ValueError:
                print("Operation failed! Please enter a valid numeric value.")

        elif option == "e":
            print("\n================ STATEMENT ================")
            print("No transactions have been made." if not statement else statement.strip())
            print(f"\nBalance: R$ {balance:.2f}")
            print("===========================================")

        elif option == "q":
            print("Thank you for using our banking system. Goodbye!")
            break

        else:
            print("Invalid operation; please select the desired operation again.")

if __name__ == "__main__":
    main()
