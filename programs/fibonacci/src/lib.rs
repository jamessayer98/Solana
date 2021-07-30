use anchor_lang::prelude::*;

#[program]
pub mod fibonacci {
    use super::*;

    #[state]
    pub struct Fib {
        pub list: [u32; 14],
        pub count: u8,
    }

    impl Fib {
        pub const LIST_SIZE: usize = 14;
        pub fn new(_ctx: Context<Initialize>, data: [u32; 2]) -> Result<Self> {
            let mut list = [0; 14];
            list[0] = data[0];
            list[1] = data[1];
            Ok(Fib {
                list,
                count: 2,
            })
        }

        pub fn next(&mut self, _ctx: Context<Initialize>) -> Result<()> {
            let count = self.count as usize;
            if count == Self::LIST_SIZE {
                return Err(ErrorCode::FibListFull.into());
            }
            self.list[count] = self.list[count - 2] + self.list[count - 1];
            self.count += 1;
            Ok(())
        }
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[error]
pub enum ErrorCode {
    #[msg("Reached maximum list length.")]
    FibListFull,
}
