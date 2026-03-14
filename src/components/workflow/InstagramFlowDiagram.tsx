import { motion } from "framer-motion";
import FlowNode from "./FlowNode";
import FlowArrow from "./FlowArrow";
import {
  Webhook,
  Filter,
  PenLine,
  GitBranch,
  MessageCircle,
  Brain,
  Heart,
  HelpCircle,
  AlertTriangle,
  Send,
  Mail,
} from "lucide-react";

const InstagramFlowDiagram = () => {
  const d = 0.08; // base delay increment

  return (
    <div className="space-y-6">
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-sm font-semibold text-primary text-center tracking-wide uppercase"
      >
        Instagram Comment Automation
      </motion.h3>

      {/* Main horizontal flow */}
      <div className="flex items-center justify-center flex-wrap gap-1 md:gap-2">
        <FlowNode icon={Webhook} label="Webhook" delay={d * 1} variant="primary" />
        <FlowArrow delay={d * 2} />
        <FlowNode icon={Filter} label="Filter Comments" delay={d * 3} />
        <FlowArrow delay={d * 4} />
        <FlowNode icon={PenLine} label="Map Fields" delay={d * 5} />
        <FlowArrow delay={d * 6} />
        <FlowNode icon={GitBranch} label="Rule Match" delay={d * 7} variant="accent" />
      </div>

      {/* Branch split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* True branch */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: d * 9 }}
          className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-3"
        >
          <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
            ✓ Direct Match
          </span>
          <div className="flex items-center justify-center gap-1">
            <FlowNode icon={Send} label="IG Reply" delay={d * 10} variant="primary" size="sm" />
            <FlowArrow delay={d * 11} />
            <FlowNode icon={Mail} label="DM" delay={d * 12} variant="primary" size="sm" />
          </div>
        </motion.div>

        {/* False branch - AI classification */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: d * 9 }}
          className="bg-secondary/5 border border-secondary/20 rounded-xl p-4 space-y-3"
        >
          <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
            ✗ AI Classification
          </span>
          <div className="flex items-center justify-center gap-1 mb-2">
            <FlowNode icon={Brain} label="Classify" delay={d * 10} variant="accent" size="sm" />
            <FlowArrow delay={d * 11} />
            <FlowNode icon={MessageCircle} label="Switch" delay={d * 12} variant="accent" size="sm" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Heart, label: "Compliment", delay: d * 13 },
              { icon: AlertTriangle, label: "Criticism", delay: d * 14 },
              { icon: HelpCircle, label: "Question", delay: d * 15 },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1">
                <FlowArrow delay={item.delay} direction="down" />
                <FlowNode icon={item.icon} label={item.label} delay={item.delay + d} size="sm" />
                <FlowArrow delay={item.delay + d * 2} direction="down" />
                <FlowNode icon={Send} label="Reply + DM" delay={item.delay + d * 3} variant="primary" size="sm" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InstagramFlowDiagram;
