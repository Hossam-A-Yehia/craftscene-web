import React, { FC } from "react";
import { QuotationsType } from "@/types/RFQs";
import ReplyCard from "@/components/molecules/ReplyCard/ReplyCard ";

interface RepliesProps {
  replies: QuotationsType[];
}

const RepliesGrid: FC<RepliesProps> = ({ replies }) => {
  return (
    <div className="space-y-6">
      {replies.map((reply) => {
        return <ReplyCard reply={reply} key={reply.id} />;
      })}
    </div>
  );
};

export default RepliesGrid;
