import graphene

from graphene import relay


class CountableConnection(relay.Connection):
    class Meta:
        abstract = True

    total_count = graphene.Int()

    def resolve_total_count(root, info, **kwargs):
        return root.length
