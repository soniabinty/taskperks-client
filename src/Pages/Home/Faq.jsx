
import img from "../../assets/Questions-pana (1).png"
const Faq = () => {
  return (
    <div className="relative border m-[80px] rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-center">
      {/* Left Section */}
      <div className="flex-1 relative">
       <img src={img} alt="" />
      </div>

      {/* Right Section */}
      <div className="flex-1 w-full p-4  shadow-lg rounded-2xl space-y-8">
        {/* Header */}
        <h2 className="text-4xl font-bold text-gray-800">
          Frequently Asked Questions
        </h2>

        {/* FAQ Accordion */}
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              How do I create an assignment for my group?
            </div>
            <div className="collapse-content">
              <p>
                To create an assignment, click on the "Create Assignment" button
                in your dashboard. Fill out the title, description, and
                deadline, and share it with your group. Once submitted, all
                group members will be able to access it.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              How can I grade my friends’ assignments?
            </div>
            <div className="collapse-content">
              <p>
                {" "}
                In the "Pending Assignments" section, you’ll find a list of
                submitted assignments from your group. Open an assignment,
                review it, and provide a grade along with optional feedback.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              Are my grades and feedback visible to everyone?
            </div>
            <div className="collapse-content">
              <p>
                No, grades and feedback are only visible to the assignment owner
                and you. Other group members cannot see the feedback unless
                explicitly shared by the owner.
              </p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
              How do I track my completed and pending assignments?
            </div>
            <div className="collapse-content">
              <p>
                {" "}
                Use the "Assignment Tracker" on your dashboard to view all
                assignments. Completed assignments will be marked, and pending
                ones will show up with their due dates for easy tracking.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;