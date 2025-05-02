
import img from "../../assets/Questions-pana (1).png"
const Faq = () => {
  return (
    <div className="relative border lg:m-[80px] rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-center px-3 md:px-12 py-6">
      {/* Left Section */}
      <div className="flex-1 relative">
       <img src={img} alt="" />
      </div>

      {/* Right Section */}
      <div className="flex-1 w-full p-4  shadow-lg rounded-2xl space-y-8">
        {/* Header */}
        <h2 className="text-4xl font-bold text-gray-400">
          Frequently Asked Questions
        </h2>

        {/* FAQ Accordion */}
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">
            What is TASKPERKS, and how does it work?
            </div>
            <div className="collapse-content">
              <p>
               TASKPERKS is a task management and reward platform designed for workers, buyers, and administrators. Workers can complete and submit tasks, earn rewards, and track progress. Buyers can post tasks, and administrators oversee the system. Users can also purchase coins to unlock more opportunities.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
            How do I submit a task on TASKPERKS?
            </div>
            <div className="collapse-content">
              <p>
               To submit a task:
Log in to your account,
Navigate to the Task Submission section,
Select the task you want to submit,
Upload the required proof (screenshots, links, or descriptions),
Click Submit, and your task will be reviewed before approval.

</p>

            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
            How do I earn rewards on TASKPERKS?
            </div>
            <div className="collapse-content">
              <p>
                You earn rewards by successfully completing tasks. Once a submitted task is approved, you receive coins, which can be used to unlock new tasks, redeem rewards, or cash out (if applicable).
            
            
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
            How can I purchase coins, and what payment methods are accepted?
            </div>
            <div className="collapse-content">
              <p>
               You can purchase coins by navigating to the Buy Coins section in your dashboard. TASKPERKS supports secure payments through Stripe, allowing transactions via credit/debit cards and other supported payment methods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;