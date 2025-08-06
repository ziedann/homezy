import React from 'react'
import SectionContainer from "@/app/components/ui/SectionContainer"
import SectionHeader from "@/app/components/ui/SectionHeader"
import AgentCard from "@/app/components/ui/AgentCard"
import Agent1 from "@/app/assets/images/agent-1.png"
import Agent2 from "@/app/assets/images/agent-2.png"
import Agent3 from "@/app/assets/images/agent-3.png"
import Agent4 from "@/app/assets/images/agent-4.png"
import Agent5 from "@/app/assets/images/agent-5.png"
import Agent6 from "@/app/assets/images/agent-6.png"

export default function AgentsSection() {
    return (
        <SectionContainer>
            <div className="flex flex-col gap-[64px]">
                <SectionHeader
                    title="Meet Our Agents"
                    browseText="Browse All Agents"
                />

                <div className="flex flex-col gap-[40px]">
                    <div className="flex flex-row justify-between">
                        <AgentCard
                            image={Agent1}
                            name="Edwin Martins"
                            role="Propetry Advisor"
                        />
                        <AgentCard
                            image={Agent2}
                            name="Robert Fox"
                            role="Propetry Advisor"
                        />
                        <AgentCard
                            image={Agent3}
                            name="Jane Cooper"
                            role="Propetry Advisor"
                        />
                    </div>
                    <div className="flex flex-row justify-between">
                        <AgentCard
                            image={Agent4}
                            name="Guy Hawkins"
                            role="Propetry Advisor"
                        />
                        <AgentCard
                            image={Agent5}
                            name="Kathryn Murphy"
                            role="Propetry Advisor"
                        />
                        <AgentCard
                            image={Agent6}
                            name="Albert Flores"
                            role="Propetry Advisor"
                        />
                    </div>
                </div>
            </div>
        </SectionContainer>
    )
}